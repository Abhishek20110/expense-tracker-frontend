"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Category {
    _id: string;
    name: string;
}

const ListCategory: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filtered, setFiltered] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortField, setSortField] = useState<keyof Category>("name");  // Use keyof Category here
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const [loading, setLoading] = useState<boolean>(false);
    const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
    const [renameCategoryId, setRenameCategoryId] = useState<string | null>(null);
    const [newName, setNewName] = useState<string>("");
    const router = useRouter();
    const apiurl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authorization token is missing");
                    router.push("/login");
                    return;
                }

                setLoading(true);
                const response = await axios.get(`${apiurl}/api/categories/my_categories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setCategories(response.data.data.categories || []);
                } else {
                    setError("Failed to fetch categories");
                }
            } catch (err) {
                setError("An error occurred while fetching categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [apiurl, router]);

    useEffect(() => {
        const handleFilterAndSort = () => {
            let filteredData = categories.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            filteredData.sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];

                if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });

            setFiltered(filteredData);
        };

        handleFilterAndSort();
    }, [searchQuery, sortField, sortOrder, categories]);

    const handleDelete = async (categoryId: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");
        
        if (!isConfirmed) {
            return; // If the user cancels, do nothing
        }
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authorization token is missing");
                router.push("/login");
                return;
            }
    
            await axios.delete(`${apiurl}/api/categories/delete/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setCategories(categories.filter(category => category._id !== categoryId));
            setSuccess("Category deleted successfully!");
        } catch (error) {
            console.error(error);
            setError("Failed to delete category");
        }
    };

    const handleAddNew = () => {
        window.open("/addcategory", "_blank");
    };

    const handleRename = (categoryId: string, oldName: string) => {
        setRenameCategoryId(categoryId);
        setNewName(oldName);
        setRenameModalOpen(true);
    };

    const handleRenameSubmit = async () => {
        if (newName) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authorization token is missing");
                    router.push("/login");
                    return;
                }

                const response = await axios.put(
                    `${apiurl}/api/categories/update/${renameCategoryId}`,
                    { name: newName },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setCategories(
                        categories.map((category) =>
                            category._id === renameCategoryId
                                ? { ...category, name: newName }
                                : category
                        )
                    );
                    setSuccess("Category renamed successfully!");
                    setRenameModalOpen(false);
                }
            } catch (error) {
                setError("Failed to rename category");
            }
        }
    };

    return (
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-xl mx-auto">
            {/* Your component content */}
        </div>
    );
};

export default ListCategory;
