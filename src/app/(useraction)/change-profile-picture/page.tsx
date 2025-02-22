"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChangeProfilePicture: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [oldPhoto, setOldPhoto] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authorization token is missing");
                    router.push('/login');
                    return;
                }

                const response = await axios.get(`${apiurl}/api/users/users/mydetails`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = response.data.data;
                // Set default image if no profile picture is available Front-End\asset\image\No_image.jpg
                setOldPhoto(userData.profilePicture || 'https://res.cloudinary.com/dmdsoq8cj/image/upload/v1726251247/todo/uploads/profile_picture/jbhzs6zunn0n86xkgjwv.jpg');
                setPreview(userData.profilePicture || 'https://res.cloudinary.com/dmdsoq8cj/image/upload/v1726251247/todo/uploads/profile_picture/jbhzs6zunn0n86xkgjwv.jpg');
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch user data");
                setLoading(false);
            }
        };

        fetchUserData();
    }, [apiurl, router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // Set preview to the newly selected file
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!file) {
            setError("No file selected");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authorization token is missing");
                router.push('/login');
                return;
            }

            const formData = new FormData();
            formData.append('profile_picture', file);

            const response = await axios.post(
                `${apiurl}/api/users/update-profile-picture`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            if (response.status === 200) {
                setSuccess("Profile picture updated successfully!");
                setPreview(response.data.profilePicture); // Update preview with new photo URL
            }
        } catch (err) {
            setError("Failed to update profile picture");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen w-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
            <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-8 text-purple-900">Change Profile Picture</h1>

            {success && <div className="text-green-600 text-center mb-4">{success}</div>}
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="text-center">
                <div className="mb-6">
                    <div className="mb-4">
                    <img
  src={preview || oldPhoto || undefined} // Ensure `null` is replaced by `undefined`
  alt="Profile"
  className="w-32 h-32 object-cover rounded-full mx-auto border-2 border-gray-300"
/>
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block mx-auto mb-4"
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300"
                >
                    Update Profile Picture
                </button>
            </form>
        </div>
        </div>
    );
};

export default ChangeProfilePicture;
