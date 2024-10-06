export const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-cyan-50">
    <span className="text-blue-500">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span>{value ?? "N/A"}</span>
  </div>
);
