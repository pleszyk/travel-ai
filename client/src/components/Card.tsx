import { Place } from '../redux/locationSlice.ts'
import { LuExternalLink } from "react-icons/lu";

type Props = {
  data: Place,
  isExpanded: boolean
}

function Card({ data, isExpanded }: Props) {
// isExpanded = true
  return (
    <div
      className={`relative m-1 flex flex-col bg-gray-50 border text-black shadow-md rounded-xl transition-all duration-300 ease-in-out 
      ${isExpanded ? 'max-h-80' : 'max-h-32'}`}
      // style={{ gridColumn: isExpanded ? 'span 2' : 'span 1' }}
    >
      {/* Image Section */}
      <div
        className={`relative ${isExpanded ? 'h-48' : 'h-24'} w-full overflow-hidden text-white shadow-lg rounded-t-xl`}
      >
        {data?.web_url && isExpanded && (
          <a
            href={data.web_url}
            rel="noreferrer"
            target="_blank"
            className="text-lg absolute top-2 right-2"
          >
            <LuExternalLink />
          </a>
        )}
        {data?.photo && (
          <img
            src={data.photo}
            alt="card-image"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Name and Rating Section */}
      <div className="p-2 flex items-center justify-between">
        <h5 className={`${isExpanded ? 'text-lg' : 'text-sm'} font-semibold`}>
          {data?.name}
        </h5>
        {isExpanded && data?.rating && (
          <div className="p-1">
            <img src={data.rating} alt="rating" />
          </div>
        )}
      </div>

      <div className="border my-1 rounded-full mx-auto w-4/5" />

      {/* Description Section (visible only when expanded) */}
      {isExpanded && data?.description && (
        <div className="p-2 overflow-auto max-h-32 mb-1.5">
          <h5 className="text-xs">{data.description}</h5>
        </div>
      )}
    </div>
  );

}

export default Card