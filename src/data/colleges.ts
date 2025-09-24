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
  // Raipur, Chhattisgarh
  {
    name: 'Govt. Nagarjuna P.G. College of Science',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/seed/101/400/250',
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
    imageUrl: 'https://picsum.photos/seed/102/400/250',
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
    imageUrl: 'https://picsum.photos/seed/103/400/250',
    aiHint: 'college building',
    programs: ['B.A.', 'B.Sc.', 'B.Com.', 'BBA', 'PGDCA'],
    cutoff: '65%-75%',
    medium: 'English & Hindi',
    facilities: ['Central Library', 'Wi-Fi Campus', 'Canteen'],
    contact: '0771-4035483',
  },
    {
    name: 'Disha College',
    location: 'Raipur, Chhattisgarh',
    imageUrl: 'https://picsum.photos/seed/104/400/250',
    aiHint: 'modern campus',
    programs: ['BCA', 'BBA', 'B.Com (CA)', 'B.Sc (CS)'],
    cutoff: '60%+',
    medium: 'English',
    facilities: ['Advanced Labs', 'Central Library', 'Wi-Fi Campus', 'Bus Service', 'Canteen'],
    contact: '0771-4263100',
  },
  // Bangalore, Karnataka
  {
    name: 'St. Joseph\'s College',
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://picsum.photos/seed/105/400/250',
    aiHint: 'historic college',
    programs: ['B.A (Economics, Political Science)', 'B.Sc (Physics, Chemistry, Mathematics)', 'B.Com', 'BCA'],
    cutoff: '85%+',
    medium: 'English',
    facilities: ['Central Library', 'Hostel', 'Wi-Fi Campus', 'Sports Complex'],
    contact: '080-22211429',
  },
  {
    name: 'Christ University',
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://picsum.photos/seed/106/400/250',
    aiHint: 'modern university',
    programs: ['B.Tech (Computer Science)', 'BBA (Finance, Marketing)', 'B.A (Journalism, Psychology)', 'B.Sc (Data Science)'],
    cutoff: 'Entrance Exam Based',
    medium: 'English',
    facilities: ['Advanced Labs', 'Central Library', 'Wi-Fi Campus', 'Hostel', 'Auditorium'],
    contact: '080-40129100',
  },
  // Delhi
  {
    name: 'Hindu College, University of Delhi',
    location: 'Delhi',
    imageUrl: 'https://picsum.photos/seed/107/400/250',
    aiHint: 'delhi university',
    programs: ['B.A (Hons) History', 'B.Sc (Hons) Physics', 'B.Com (Hons)'],
    cutoff: '98%+',
    medium: 'English',
    facilities: ['Central Library', 'Hostel', 'Wi-Fi Campus', 'Canteen', 'Gymnasium'],
    contact: '011-27667184',
  },
  {
    name: 'Shri Ram College of Commerce (SRCC)',
    location: 'Delhi',
    imageUrl: 'https://picsum.photos/seed/108/400/250',
    aiHint: 'commerce college',
    programs: ['B.Com (Hons)', 'B.A (Hons) Economics'],
    cutoff: '99%+',
    medium: 'English',
    facilities: ['Central Library', 'Wi-Fi Campus', 'Sports Complex', 'Hostel'],
    contact: '011-27667905',
  },
  // Mumbai, Maharashtra
  {
    name: 'St. Xavier\'s College',
    location: 'Mumbai, Maharashtra',
    imageUrl: 'https://picsum.photos/seed/109/400/250',
    aiHint: 'mumbai college',
    programs: ['B.A (Sociology)', 'B.Sc (IT)', 'BMS (Bachelor of Management Studies)'],
    cutoff: '95%+',
    medium: 'English',
    facilities: ['Central Library', 'Wi-Fi Campus', 'Canteen', 'Audio-Visual Room'],
    contact: '022-22620661',
  },
  // Chennai, Tamil Nadu
  {
    name: 'Loyola College',
    location: 'Chennai, Tamil Nadu',
    imageUrl: 'https://picsum.photos/seed/110/400/250',
    aiHint: 'chennai college',
    programs: ['B.Sc (Visual Communication)', 'B.Com (Corporate Secretaryship)', 'B.A (French Literature)'],
    cutoff: '90%+',
    medium: 'English',
    facilities: ['Central Library', 'Hostel', 'Sports Complex', 'Media Labs'],
    contact: '044-28178200',
  },
];
