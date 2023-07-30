import Surface from '@/src/core/components/Surface';
import Text from '@/src/core/components/Text';
import Link from 'next/link';
import React from 'react';

import { BiLinkExternal } from "react-icons/bi";

interface ExperiencePeriod {
    title: string;
    employment_type: "Part Time" | "Full Time" | "Intership";
    start_date: string;
    end_date?: string;
    desc: string;
}

interface ExperienceProps {
    company: string;
    website: string;
    skills: string[];
    location: string;
    working_type: "On-site" | "Remote" | "Hybrid";
    periods: ExperiencePeriod[];
}

const Item = ({ data }: any) => {
    const { company, website, skills, location, working_type, periods, } = data;
    
    return (
        <Surface inOrder customClassname={['flex', 'flex-col', 'gap-6']}>
            <div className="flex flex-row z-[2]">
                <div className="flex-auto">
                    <div className='flex flex-wrap justify-between mb-2 gap-x-3'>
                        <Text tag="h4" customClassname={['sm:inline-block']} ><Link href={website} target='_blank' >{company}</Link> - {periods[0].title}</Text>
                        { periods.length == 1 &&
                            <Text customClassname={['whitespace-nowrap']}>
                                {periods[0].start_date} {periods[0].end_date && '- ' + periods[0].end_date}
                            </Text>
                        }
                    </div>

                    <Text>Skills:  {skills.join(" · ")} </Text>
                </div>
            </div>
            {/* {location} */}

            {
                periods.length > 1 && (
                    <ul className='periods'>
                    {periods.map(
                        ({
                            title,
                            employment_type,
                            start_date,
                            end_date,
                            desc,
                        } : ExperiencePeriod) => (
                            <li key={title} className='flex flex-wrap justify-between items-center'>
                                <Text >{title} - {employment_type}</Text> <Text customClassname={['whitespace-nowrap']}>{start_date} - {end_date}</Text>
                            </li>
                        )
                    )}
                </ul>
                )

            }

        </Surface>
    )
}

export default Item