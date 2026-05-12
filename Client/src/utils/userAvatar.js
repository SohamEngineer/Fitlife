import { assets } from "../assets/img/assets";

export const getUserAvatarSrc = (user) => {
  if (!user) return "";

  const explicitAvatar =
    user.profileImage ||
    user.profileImageUrl ||
    user.avatar ||
    user.avatarUrl ||
    user.photo ||
    user.photoUrl ||
    user.image;

  if (explicitAvatar) return explicitAvatar;

  const email = String(user.email || "").toLowerCase();
  const name = String(user.name || "").toLowerCase();

  if (email.includes("sohamata") || name.includes("soham")) {
    return assets.soham;
  }

  return "";
};

export const getUserInitial = (user) =>
  String(user?.name || user?.email || "U").trim().charAt(0).toUpperCase() || "U";
