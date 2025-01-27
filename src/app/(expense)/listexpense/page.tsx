"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Listexpense: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch expenses from API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (!token) {
          setError("Authorization token is missing");
          router.push("/login");
          return;
        }
        const response = await axios.get(`${apiurl}/api/expenses/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data.data);
        setFilteredExpenses(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Error fetching expenses");
        setSuccess(null);
      }
    };
    fetchExpenses();
  }, [apiurl, router, token]);

  // Filter and sort expenses
  useEffect(() => {
    let filtered = expenses.filter(
      (expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredExpenses(filtered);
  }, [search, sortField, sortOrder, expenses]);

  // Handle delete expense
  const handleDelete = async (expenseId: string) => {
    try {
      if (!token) {
        setError("Authorization token is missing");
        router.push("/login");
        return;
      }
      await axios.delete(`${apiurl}/api/expenses//delete/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      setSuccess("Expense deleted successfully!");
      setError(null);
    } catch (err) {
      console.error("Failed to delete expense:", err);
      setError("Failed to delete expense");
      setSuccess(null);
    }
  };

  const handleAddExpense = () => {
    window.open("/addexpense", "_blank");
  };
  const handleAddcat = () => {
    window.open("/addcategory", "_blank");
  };

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-xl mx-auto">
      <div className="absolute top-0 right-0 mt-4 mr-4 flex gap-2">
  <button
    onClick={handleAddExpense}
    className="px-3 py-2 sm:px-4 sm:py-2 text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-transform transform hover:scale-105 duration-300"
  >
    Add New Expense
  </button>
  <button
    onClick={handleAddcat}
    className="px-3 py-2 sm:px-4 sm:py-2 text-white bg-gradient-to-r from-green-400 to-green-500 rounded-lg hover:from-green-500 hover:to-green-600 transition-transform transform hover:scale-105 duration-300"
  >
    Add New Category
  </button>
</div>

      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-purple-900">My Expenses</h1>

      {success && <div className="text-green-600 text-center mb-4">{success}</div>}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div>
          <label className="mr-2">Sort By:</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="title">Title</option>
            <option value="category.name">Category Name</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Sl</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Title</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Date</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Category</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Amount</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Comments</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={expense._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b border-gray-200">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{expense.title}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
  {new Date(expense.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</td>

                  <td className="py-3 px-4 border-b border-gray-200">{expense.category.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{expense.amount}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{expense.note || "No comments"}</td>
                 

<td className="py-3 px-4 border-b border-gray-200 flex flex-wrap gap-2">
  <button
    onClick={() => router.push(`/expensedetails?id=${expense._id}`)}
    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
  >
    <EyeIcon className="h-5 w-5" />
  </button>
  <button
    onClick={() => router.push(`/editexpense?id=${expense._id}`)}
    className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
  >
    <PencilIcon className="h-5 w-5" />
  </button>
  <button
    onClick={() => handleDelete(expense._id)}
    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
  >
    <TrashIcon className="h-5 w-5" />
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-4 text-center text-gray-600">
                  No expenses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listexpense;
