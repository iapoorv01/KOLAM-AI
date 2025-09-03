-- Create a function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, description, profile_image_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    '',
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    -- Only update username if it's empty and we have a new value
    username = CASE 
      WHEN profiles.username = '' AND COALESCE(new.raw_user_meta_data->>'full_name', '') != '' 
      THEN COALESCE(new.raw_user_meta_data->>'full_name', '')
      ELSE profiles.username
    END,
    -- Only update profile_image_url if it's empty and we have a new value
    profile_image_url = CASE 
      WHEN profiles.profile_image_url = '' AND COALESCE(new.raw_user_meta_data->>'avatar_url', '') != '' 
      THEN COALESCE(new.raw_user_meta_data->>'avatar_url', '')
      ELSE profiles.profile_image_url
    END;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy for users to insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
