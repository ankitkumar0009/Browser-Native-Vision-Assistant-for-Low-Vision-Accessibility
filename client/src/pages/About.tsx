export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-lg">
      <h1 className="text-4xl font-bold border-b-4 border-[var(--primary)] pb-4">About the Project</h1>
      
      <section className="bg-[var(--secondary)] p-8 rounded-2xl space-y-4">
        <h2 className="text-2xl font-bold">Purpose</h2>
        <p>
          The Browser-Native Vision Assistant is built to make the digital and physical world more accessible to individuals with low vision or visual impairments. By combining modern AI models with browser-native APIs, this tool provides instant auditory feedback and clear, readable text about a user's surroundings.
        </p>
      </section>

      <section className="bg-[var(--secondary)] p-8 rounded-2xl space-y-4">
        <h2 className="text-2xl font-bold">Privacy & Security</h2>
        <p>
          Your privacy is a priority. 
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Images uploaded or captured via the camera are processed directly and are <strong>not permanently stored</strong>.</li>
          <li>Temporary data used for AI analysis is immediately discarded after the results are returned.</li>
          <li>Camera access is strictly controlled by the browser and only active when you explicitly start the Live Vision mode.</li>
        </ul>
      </section>

      <section className="bg-[var(--secondary)] p-8 rounded-2xl space-y-4">
        <h2 className="text-2xl font-bold">Limitations</h2>
        <div className="bg-[var(--destructive)]/10 border-l-4 border-[var(--destructive)] p-4 rounded">
          <p className="font-semibold text-[var(--destructive)]">
            AI is not perfect. The descriptions and text extracted may sometimes be inaccurate or incomplete. This tool should not be used for critical navigation or in situations where personal safety is at risk.
          </p>
        </div>
      </section>

      <section className="bg-[var(--secondary)] p-8 rounded-2xl space-y-4">
        <h2 className="text-2xl font-bold">Technologies Used</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Frontend:</strong> React, TypeScript, Vite, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Express</li>
          <li><strong>Browser APIs:</strong> Web Speech API, MediaDevices API</li>
        </ul>
      </section>
    </div>
  );
}
