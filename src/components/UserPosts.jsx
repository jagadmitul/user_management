import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getUserPosts } from '../services/UserService';

const UserPosts = () => {
    const { userId } = useParams(); // Get userId from URL
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserPosts = async () => {
        setLoading(true);
        try {
            const response = await getUserPosts(userId);
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [userId]);

    if (loading) {
        return <div className="text-center py-4">Loading posts...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-4">{state?.user_name}'s Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                    <div key={post.id} className="border rounded-md p-4">
                        <h2 className="font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPosts;