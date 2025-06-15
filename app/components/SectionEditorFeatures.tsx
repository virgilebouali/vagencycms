// "use client"

// type Props = {
//   section: {
//     id: string
//     content: any
//   }
// }

// export default function SectionEditorFeatures({ section }: Props) {
//   const items = section.content.items || []

//   return (
//     <div>
//       <h2 className="font-bold text-lg mb-2">Avantages</h2>
//       {items.map((item: any, index: number) => (
//         <div key={index} className="mb-2 space-y-1">
//           <input
//             type="text"
//             name={`items[${index}].icon`}
//             defaultValue={item.icon}
//             placeholder="Icône"
//             className="border p-1 w-16"
//           />
//           <input
//             type="text"
//             name={`items[${index}].title`}
//             defaultValue={item.title}
//             placeholder="Titre"
//             className="border p-1 w-full"
//           />
//           <input
//             type="text"
//             name={`items[${index}].text`}
//             defaultValue={item.text}
//             placeholder="Texte"
//             className="border p-1 w-full"
//           />
//         </div>
//       ))}
//     </div>
//   )
// }
