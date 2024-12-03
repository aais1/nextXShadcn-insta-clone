"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PostImg from '../components/Post-Img.png'; 
import { Loader2 } from "lucide-react";

export default function ProfilePage({ params }: { params: { profileName: string } }) {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string | null>("posts");

    const [loading, setLoading] = useState(false); // Loader state
    const [data, setData] = useState<any>(null); // Data to be rendered (posts, saved, etc.)

    // Static profile data for demonstration
    const staticProfile = {
        name: 'Ali Aais',
        avatar: 'https://github.com/shadcn.png',
        bio: 'A passionate software engineer who loves to build amazing web applications.',
        posts: 0,
        followers: 1234,
        following: 123,
    };

    useEffect(() => {
        setProfile(staticProfile);
    }, []);


    const fetchData = async (tab: string) => {
        setLoading(true);
        try {
            let response;
            switch (tab) {
                case "posts":
                    response = await new Promise((resolve) => setTimeout(() => resolve([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]), 1000));
                    break;
                case "saved":
                    response = await new Promise((resolve) => setTimeout(() => resolve([{ id: 1, title: "Saved Item 1" }]), 1000));
                    break;
                case "tagged":
                    response = await new Promise((resolve) => setTimeout(() => resolve([{ id: 1, title: "Tagged Item 1" }]), 1000));
                    break;
                default:
                    response = [];
            }
            setData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeTab!);
    }, [activeTab]);

    if (!profile) return <div>Loading profile...</div>;

    return (
        <div>
            <div className="w-full mt-10 md:w-[55vw] mx-auto pb-6 md:p-4">
                <Card className="bg-white shadow-lg rounded-xl p-6">
                    <div className="flex flex-col gap-y-6 md:gap-y-0 md:flex-row justify-between items-center space-x-6">
                        <Avatar className="w-48 h-48 cursor-pointer border-[3px] border-red-500">
                            <AvatarImage src={profile.avatar} />
                            <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex gap-x-4 md:gap-x-6 justify-between md:justify-start items-center">
                                <h1 className="text-3xl font-semibold">{profile.name || 'Ali Aais'}</h1>
                                <Button>Edit Profile</Button>
                            </div>
                            <div className="flex justify-between text-white">
                                <span><strong>{profile.posts}</strong> Posts</span>
                                <span><strong>{profile.followers}</strong> Followers</span>
                                <span><strong>{profile.following}</strong> Following</span>
                            </div>
                            <div className="flex">
                                <p>{profile.bio || 'No bio available.'}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex justify-center gap-x-4 mt-6">
                <button onClick={()=>{
                    setActiveTab('posts')
                }} className={`text-lg text-blue-500 hover:underline ${activeTab === 'posts' ? 'font-semibold' : ''}`}>Posts</button>
                <button onClick={()=>{
                    setActiveTab('saved')
                }} className={`text-lg text-blue-500 hover:underline ${activeTab === 'saved' ? 'font-semibold' : ''}`}>Saved</button>
                <button onClick={()=>{
                    setActiveTab('tagged')
                }} className={`text-lg text-blue-500 hover:underline ${activeTab === 'tagged' ? 'font-semibold' : ''}`}>Tagged</button>
            </div>

            <div className="mt-6 mx-auto w-full md:w-[80vw] px-2 md:px-0">
                {loading ? (
                    <div className="text-center flex justify-center items-center min-h-[20vh]"><Loader2 className="animate-spin w-24 h-24 "/></div>
                ) : (
                 
                    <>
                        {activeTab === "posts" && (
                            <div>
                                <h3 className="text-xl font-semibold">Displaying Posts</h3>
                                {data?.map((post: any) => (
                                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <h4 className="text-lg font-medium">{post.title}</h4>
                                        {/* Render Post Image */}
                                        <img src={PostImg} alt={post.title} className="w-full h-48 object-cover rounded-lg mt-2" />
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === "saved" && (
                            <div>
                                <h3 className="text-xl font-semibold">Displaying Saved Items</h3>
                                {data?.map((item: any) => (
                                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <h4 className="text-lg font-medium">{item.title}</h4>
                                        {/* Render Saved Item Image */}
                                        <img src={PostImg} alt={item.title} className="w-full h-48 object-cover rounded-lg mt-2" />
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === "tagged" && (
                            <div>
                                <h3 className="text-xl font-semibold">Displaying Tagged Items</h3>
                                {data?.map((item: any) => (
                                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <h4 className="text-lg font-medium">{item.title}</h4>
                                        {/* Render Tagged Item Image */}
                                        <img src={PostImg} alt={item.title} className="w-full h-48 object-cover rounded-lg mt-2" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                    
                )}
            </div>
        </div>
    );
}
