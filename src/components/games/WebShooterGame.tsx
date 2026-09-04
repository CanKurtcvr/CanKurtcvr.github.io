export default function WebShooterGame() {
  return (
    <div className="w-full aspect-video min-h-[480px] overflow-hidden rounded-lg bg-[#0f0f18]">
      <iframe
        title="Spidey Web Shooter"
        src={`${import.meta.env.BASE_URL}games/web-shooter/index.html`}
        className="h-full w-full border-0"
        allow="camera; microphone 'none'"
      />
    </div>
  );
}
