import { Fragment, useEffect, useState } from "react";
import { ROUTES } from "../../router/Routs";
import { NavigationUtils } from "../../utils/NavigationUtils";
import {
  AppBar,
  Box,
  CardContent,
  Card,
  Typography,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import ImageUpload from "../../Components/ImageUpload";
import {
  UpdateAvatarRequest,
  UserDetailsResponse,
} from "../../Interfaces/ProfileInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";

const Profile = () => {
  const { navigateTo } = NavigationUtils();
  const { getMe, updateAvatar: updateAvatarApi } = UseNetworkCalls();
  const [user, setUser] = useState<UserDetailsResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null); // Store the new avatar

  // handle back button
  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  useEffect(() => {
    // UseEffect should be useEffect
    const fetchUser = async () => {
      try {
        const response = await getMe();
        console.log("User Details", response);
        setUser(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Update the avatar
  const handleUpdateAvatar = async () => {
    if (!newAvatar) {
      return;
    }
    setUpdating(true);
    try {
      console.log("New Avatar", newAvatar);
      // Ensure avatar URL is properly formatted (remove extra quotes if any)
      const cleanAvatar = newAvatar.replace(/^"|"$/g, "");

      console.log("Cleaned Avatar URL:", cleanAvatar);

      const updateAvatarRequest: UpdateAvatarRequest = {
        avatar: cleanAvatar,
      };
      const response = await updateAvatarApi(updateAvatarRequest);
      console.log("Update Avatar Response", response);
      setUser((prev) => (prev ? { ...prev, avatar: newAvatar } : prev));
      // Call the update avatar API
      // const response = await updateAvatar(newAvatar);
      // console.log("Update Avatar Response", response);
      // setUser((prev) => ({ ...prev, avatar: newAvatar }));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  // loading and error handling
  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        {error}
      </Typography>
    );
  }
  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} heading="Profile" />
      </AppBar>
      <Box
        alignItems={"center"}
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 3,
          textAlign: "center",
          mt: 5,
        }}
      >
        <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            User Profile
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar
              src={
                user?.avatar || "https://via.placeholder.com/150?text=No+Avatar"
              }
              alt="User Avatar"
              sx={{ width: 120, height: 120, mb: 2 }}
            /> */}
            <ImageUpload
              onUploadSuccess={
                (imageUrl) => setNewAvatar(imageUrl) // Set the new avatar
              }
              initialImageUrl={user?.avatar}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!newAvatar || updating}
              sx={{ mt: 2, backgroundColor: "#191725" }}
              onClick={() => handleUpdateAvatar()}
            >
              {updating ? "updating.." : "Update Avatar"}
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />

          <CardContent>
            <Typography variant="body1">
              <strong>Username:</strong> {user?.userName}
            </Typography>
            <Typography variant="body1">
              <strong>Full Name:</strong> {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user?.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Preferred Language:</strong>{" "}
              {user?.preferredLanguage?.toUpperCase()}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong>{" "}
              {user?.status === 1 ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body1">
              <strong>Type:</strong> {user?.type === 2 ? "Admin" : "User"}
            </Typography>
            <Typography variant="body1">
              <strong>Registration Date:</strong>{" "}
              {user?.registrationDate &&
                new Date(user.registrationDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Last Update:</strong>{" "}
              {user?.updateTime &&
                new Date(user.updateTime).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
};

export default Profile;
