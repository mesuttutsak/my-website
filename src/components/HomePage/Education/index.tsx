import DraggableProivder, {
    DraggableElement,
} from "@/src/core/components/Draggable";
import Section, { Headline } from "@/src/core/components/Section";
import Surface from "@/src/core/components/Surface";
import Text from "@/src/core/components/Text";
import React from "react";

interface InformationProps {
    name: string;
    department: string;
    grade: number;
    start_date: string;
    end_date: string;
    sertificate: SertificateProps[];
}

interface SertificateProps {
    title: string;
    period: string[];
}

const information: InformationProps = {
    name: "Cyprus International University",
    department: 'Interior Architecture',
    grade: 3.38,
    start_date: "2015",
    end_date: "2020",
    sertificate: [
        {
            title: 'High Honor Certificate x4',
            period: [
                '2018-2019 - Autumn:3,65 - Spring:3,51 (High Honor Certificate x 2)',
                '2019-2020 - Autumn:3,55 - Spring:4,00 (High Honor Certificate x 2)']
        },
        {
            title: 'Honor Certificate x2',
            period: ['2017-2018 Autumn:3,00 - Spring:3.33 (Honor Certificate x 2)']
        }
    ]
}

const Education = () => {
    const { name, department, grade, start_date, end_date, sertificate } = information;
    return (
        <Section id="education" customClassname={['flex flex-col gap-4']}>
            <Headline>
                <Text tag="h3">Education</Text>
            </Headline>
            <Surface inOrder>
                <div className="row">
                    <Text tag="h4">{name}</Text>
                    <Text fontSize="sm">{start_date} - {end_date}</Text>
                </div>
                <div className="row">
                    <Text fontSize="sm">{department} - {grade}</Text>
                </div>
            </Surface>
            <Surface inOrder customClassname={['flex flex-col gap-6']}>
                {sertificate.map((obj: SertificateProps, i) => {
                    const { title, period } = obj;

                    return (
                        <div key={'p_' + i} className="flex flex-col gap-3" >
                            <Text tag="h4" fontSize="md">{title}</Text>
                            <ul className="flex flex-col gap-2 ml-3 pl-3">
                                {period.map((e, i) => <li key={'p2_' + i} className="d-block">
                                    <Text fontSize="sm">{e}</Text>
                                </li>)}
                            </ul>
                        </div>)
                })
                }

            </Surface>
        </Section>
    );
};

export default Education;
