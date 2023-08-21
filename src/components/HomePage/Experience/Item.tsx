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
        <Surface inOrder customClassname={['item']}>
            <div className='itemContainer'>
                <div className="itemWrap">
                    <div className='heading'>
                        <div className='sm:inline-block'>
                            <Text tag="h4" customClassname={['sm:inline-block']} >
                                <Link href={website} target='_blank' >{company}</Link>
                            </Text>
                            <span className='sm:inline-block hidden px-2'>-</span>
                            <Text fontSize='md' tag="h4" customClassname={['inline-block']} >{periods[0].title}</Text>
                        </div>
                        { periods.length == 1 &&
                            <Text fontSize='sm' customClassname={['whitespace-nowrap']}>
                                {periods[0].start_date} {periods[0].end_date && '- ' + periods[0].end_date}
                            </Text>
                        }
                    </div>

                    <Text fontSize='sm'>Skills: {skills.join(" · ")} </Text>
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
                        }: ExperiencePeriod, i: any ) => (
                            <li key={'jp_'+title+start_date}>
                                <Text fontSize='md'>{title} - {employment_type}</Text> <Text fontSize='sm' customClassname={['whitespace-nowrap']}>{start_date} - {end_date}</Text>
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