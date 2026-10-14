import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  profile: {
    name: string;
    college: string;
    cgpa: string;
    photo: string;
  };
  onClose: () => void;
  onSave: (data: {
    name: string;
    college: string;
    cgpa: string;
    photo: string;
  }) => void;
};

export default function EditProfileDialog({
  profile,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [cgpa, setCgpa] = useState(profile.cgpa);
  const [photo, setPhoto] = useState(profile.photo);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPhoto(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      name,
      college,
      cgpa,
      photo,
    });

    onClose();
  };

  return (
    <Card className="fixed inset-0 m-auto z-50 h-fit w-[500px] p-6 shadow-xl">
      <h2 className="mb-5 text-2xl font-bold">
        Edit Profile
      </h2>

      <div className="space-y-4">

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>

        <div className="space-y-2">
          <Label>College</Label>
          <Input
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="College"
          />
        </div>

        <div className="space-y-2">
          <Label>CGPA</Label>
          <Input
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            placeholder="CGPA"
          />
        </div>

        <div className="space-y-2">
          <Label>Profile Photo</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>

      </div>
    </Card>
  );
}