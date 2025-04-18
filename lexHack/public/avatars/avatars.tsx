// import React from "react";



// export default function AvatarGallery() {
//   return (
//     <div className="grid grid-cols-3 gap-4 p-4">
//       {avatars.map((filename, index) => (
//         <img
//           key={index}
//           src={`/avatars/${filename}`}
//           alt={`Avatar ${index + 1}`}
//           className="w-20 h-20 rounded-full shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
//         />
//       ))}
//     </div>
//   );
// }
import React from "react";
import clsx from "clsx";

const avatars = [
    "courthouse.png",
    "agreement.png",
    "balance.png",
    "law.png",
    "law2.png",
    "stamp.png",
  ];

type AvatarSelectorProps = {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
};

export default function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {avatars.map((filename) => {
        const isSelected = selectedAvatar === filename;

        return (
          <img
            key={filename}
            src={`LexHack_innovate/avatars/${filename}`}
            alt={filename}
            onClick={() => onSelect(filename)}
            className={clsx(
              "w-20 h-20 rounded-full border-4 cursor-pointer transition-all duration-200",
              isSelected ? "border-purple-600 scale-110" : "border-transparent hover:scale-105"
            )}
          />
        );
      })}
    </div>
  );
}
