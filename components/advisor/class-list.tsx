"use client"

import { ClassInfo } from "@/types/advisor";

interface ClassListProps {
  classes: ClassInfo[];
  selectedClassId?: string;
  onSelectClass: (classId: string) => void;
}

export function ClassList({ classes, selectedClassId, onSelectClass }: ClassListProps) {
  return (
    <div className="space-y-2">
      {classes.map((classInfo) => (
        <button
          key={classInfo.id}
          onClick={() => onSelectClass(classInfo.id)}
          className={`w-full p-3 rounded-lg text-left transition-colors
            ${selectedClassId === classInfo.id 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-muted'
            }
          `}
        >
          <div className="break-words">
            <p className="font-medium line-clamp-2">{classInfo.name}</p>
            <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
              <span>{classInfo.totalStudents} students</span>
              {classInfo.pendingReviews > 0 && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {classInfo.pendingReviews} pending
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
