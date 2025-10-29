import { Link } from 'react-router-dom';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <Link to={`/experience/${experience._id}`} className="block group">
      <div className="card hover:transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f0c419] transition-colors duration-300">
              {experience.title}
            </h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap group-hover:bg-[#F4D03F] group-hover:text-black transition-all duration-300">
              {experience.location}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-700">
              From <span className="font-bold text-lg text-gray-900">₹{experience.price}</span>
            </div>
            <div className="btn-primary text-sm px-4 py-2">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
