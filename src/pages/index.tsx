export const getConfig = async () => {
  return {
    render: "static",
  };
};

export default async function HomePage() {
  return (
    <div>
      <title>Index</title>
    </div>
  );
}
