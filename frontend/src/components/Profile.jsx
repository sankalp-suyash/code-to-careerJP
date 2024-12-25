import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialogue'; // Fixed import
import { useSelector } from 'react-redux'; // For dynamic user data

export const Profile = () => {
  const { user } = useSelector((store) => store.auth); // Fetch user data from Redux store
  const [open, setOpen] = useState(false);

  const skills = user?.profile?.skills || []; // Default to empty array if no skills
  const isResume = user?.profile?.resume; // Check if resume exists

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://png.pngtree.com/png-vector/20220509/ourmid/pngtree-company-logo-design-trademark-design-creative-logo-png-image_4569380.png"
                alt="User Avatar"
              />
            </Avatar>
            <div>
              <h1>{user?.fullname || "Full Name"}</h1>
              <p>{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "No email available"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "No phone number available"}</span>
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-1">
            <h1>Skills: </h1>
            {skills.length !== 0 ? (
              skills.map((item, index) => (
                <Badge key={index} className="bg-gray-400">
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};
