type Props = {
title: string;
icon?: React.ReactNode; // tambahkan ini
children: React.ReactNode;
};

export default function AuthCard({ title, icon, children }: Props) {
return (
<div className="flex items-center justify-center bg-transparant">
<div className="w-full max-w-md border border-gray-200 rounded-lg p-8 bg-white shadow-sm ">
{/* tampilkan ikon kalau ada */}
{icon && <div className="text-center mb-4">{icon}</div>}
<h1 className="text-2xl font-bold text-center mb-6 font-sans">{title}</h1>
{children}
</div>
</div>
);
}


