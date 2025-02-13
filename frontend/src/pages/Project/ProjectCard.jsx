// components/ProjectCard.jsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ExternalLinkIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ layout = "grid" }) => {
  const navigate = useNavigate();

  const tags = ["React", "Node.js", "MongoDB"];
  
  return (
    <Card className="group transition-all duration-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/5">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <button
              onClick={() => navigate("/project/1")}
              className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
            >
              Project Name
              <ExternalLinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Full Stack</span>
              <span>•</span>
              <Badge variant="secondary" className="rounded-full">
                In Progress
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVerticalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        {layout === "grid" ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;