import { Link } from 'react-router-dom';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="card">
      <div className="relative h-48">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {experience.title}
          </h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">
            {experience.location}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {experience.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-900">
            From <span className="font-semibold">₹{experience.price}</span>
          </div>
          <Link
            to={`/experience/${experience._id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
