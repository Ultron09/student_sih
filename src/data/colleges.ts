export interface College {
  name: string;
  location: string;
  imageUrl: string;
  aiHint: string;
  programs: string[];
  cutoff: string;
  medium: string;
  facilities: string[];
  contact: string;
}

export const collegesData: College[] = [
  {
    name: 'Govt. Nagarjuna P.G. College of Science',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/400/253',
    aiHint: 'science college',
    programs: ['B.Sc. (Physics, Chemistry, Maths)', 'B.Sc. (Computer Science)', 'M.Sc. (Physics)', 'M.Sc. (Chemistry)'],
    cutoff: '75%-85%',
    medium: 'Hindi & English',
    facilities: ['Advanced Labs', 'Central Library', 'Wi-Fi Campus', 'Canteen'],
    contact: '0771-2426817',
  },
  {
    name: 'Pt. Ravishankar Shukla University',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/400/252',
    aiHint: 'university campus',
    programs: ['B.Sc. (IT)', 'BCA', 'B.A. (Journalism)', 'B.P.E.', 'B.Lib.I.Sc.'],
    cutoff: 'As per university norms',
    medium: 'English',
    facilities: ['Hostel', 'Advanced Labs', 'Central Library', 'Wi-Fi Campus', 'Sports Complex', 'Bus Service'],
    contact: '0771-2262540',
  },
  {
    name: 'Durga Mahavidyalaya, Raipur',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/400/251',
    aiHint: 'college building',
    programs: ['B.A.', 'B.Sc.', 'B.Com.', 'BBA', 'PGDCA'],
    cutoff: '65%-75%',
    medium: 'English & Hindi',
    facilities: ['Central Library', 'Wi-Fi Campus', 'Canteen'],
    contact: '0771-4035483',
  },
  {
    name: 'Chhattisgarh College, Raipur',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/400/254',
    aiHint: 'classroom students',
    programs: ['B.Com (Computers)', 'B.A. (Economics, History)', 'B.Sc. (Biology)'],
    cutoff: '60%-70%',
    medium: 'Hindi & English',
    facilities: ['Central Library', 'Sports Facilities'],
    contact: '0771-2536835',
  },
  {
    name: 'Govt. Degree College, Raipur',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/400/250',
    aiHint: 'college facade',
    programs: ['B.A. (Sociology)', 'B.Sc. (Maths)', 'B.Com.'],
    cutoff: '55%-65%',
    medium: 'Hindi & English',
    facilities: ['Hostel', 'Advanced Labs', 'Central Library', 'Wi-Fi Campus'],
    contact: '0771-2263022',
  },
  {
    name: 'Disha College',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/400/255',
    aiHint: 'modern campus',
    programs: ['BCA', 'BBA', 'B.Com (CA)', 'B.Sc (CS)'],
    cutoff: '60%+',
    medium: 'English',
    facilities: ['Advanced Labs', 'Central Library', 'Wi-Fi Campus', 'Bus Service', 'Canteen'],
    contact: '0771-4263100',
  }
];
