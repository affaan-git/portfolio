import Image from "next/image";

interface EducationItemProps {
  iconSrc?: string | null;
  institution: string;
  program: string;
  dateRange?: string;
}

export default function EducationItem({
  iconSrc,
  institution,
  program,
  dateRange,
}: EducationItemProps) {
  return (
    <div
      className={`bg-gray-100 dark:bg-dark-muted rounded-xl p-6 shadow-md flex items-center ${
        iconSrc ? "space-x-4" : ""
      } outline outline-2 outline-transparent hover:outline-green-300 dark:hover:outline-green-500 transition-all duration-150`}
    >
      {iconSrc && (
        <div className="w-12 h-12 relative flex-shrink-0">
          <Image
            src={iconSrc}
            alt={institution}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-sm"
          />
        </div>
      )}

      <div className="text-black dark:text-white">
        <p className="text-lg font-medium">{institution}</p>
        <p className="text-base opacity-80 mt-1">
          {program}
          {dateRange && `, ${dateRange}`}
        </p>
      </div>
    </div>
  );
}