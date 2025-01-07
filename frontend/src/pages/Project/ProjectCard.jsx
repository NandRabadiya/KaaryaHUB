import { Card } from "@/components/ui/card";
import React from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";

const ProjectCard = () => {
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1 className="cursor-pointer font-bold text-lg">Create Edu Platform</h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400">FullStack</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ProjectCard;
