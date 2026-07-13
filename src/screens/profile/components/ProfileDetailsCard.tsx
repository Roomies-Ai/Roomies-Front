import React from "react";
import { User, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import type { ProfileFormState } from "../types/profile.types";
import DetailInput from "./DetailInput";

interface ProfileDetailsCardProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  editForm: ProfileFormState;
  setEditFormField: (field: keyof ProfileFormState, value: any) => void;
  handleUpdateProfile: () => void;
  loading: boolean;
  variants: any;
}

const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({
  isEditing,
  setIsEditing,
  editForm,
  setEditFormField,
  handleUpdateProfile,
  loading,
  variants,
}) => {
  return (
    <motion.div
      variants={variants}
      className="bg-white p-6 rounded-[2.5rem] shadow-premium-sm border border-slate-50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-900 font-black tracking-tight">My Details</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(false)}
              className="text-slate-400 text-xs font-black uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="text-primary text-xs font-black uppercase tracking-widest"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <DetailInput
          label="Full Name"
          icon={<User size={18} className="text-slate-400" />}
          value={editForm.username}
          onChange={(val) => setEditFormField("username", val)}
          disabled={!isEditing}
          isEditing={isEditing}
        />

        <DetailInput
          label="Email Address"
          icon={<Mail size={18} className="text-slate-400" />}
          value={editForm.email}
          onChange={(val) => setEditFormField("email", val)}
          disabled={!isEditing}
          isEditing={isEditing}
        />

        <DetailInput
          label="Phone Number"
          icon={<Phone size={18} className="text-slate-400" />}
          value={editForm.phoneNumber}
          onChange={(val) => setEditFormField("phoneNumber", val)}
          disabled={!isEditing}
          isEditing={isEditing}
          placeholder={
            isEditing ? "Enter phone number" : "Phone Number Is Missing"
          }
        />
      </div>
    </motion.div>
  );
};

export default ProfileDetailsCard;
