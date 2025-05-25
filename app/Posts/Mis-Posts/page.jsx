import Card from "@/components/Card";

export default function MisPosts() {
  return (
    <>
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 7 }).map((_, i) => (
            <Card key={i} title="Title" user="User" id={i} />
          ))}
        </div>
      </div>
    </>
  );
}
