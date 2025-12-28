import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Shield } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/users');
                setUsers(data);
            } catch (error) {
                toast.error('Failed to load customers');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Customers & Users
                </h1>
                <p className="text-gray-400">Manage platform users and access</p>
            </header>

            <div className="glass-card p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent"
                    />
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800/50 border-b border-gray-700">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Role</th>
                                <th className="p-4 text-right">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-500">Loading...</td></tr>
                            ) : filteredUsers.map((user, i) => (
                                <motion.tr
                                    key={user._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/5"
                                >
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-white">{user.name}</span>
                                    </td>
                                    <td className="p-4 text-gray-300">{user.phone}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' || user.role === 'super_admin'
                                                ? 'bg-purple-500/20 text-purple-400'
                                                : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customers;
