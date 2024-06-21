export interface InformationProps {
    name: string;
    department: string;
    grade: number;
    start_date: string;
    end_date: string;
    sertificate: SertificateProps[];
}

export interface SertificateProps {
    title: string;
    period: string[];
}