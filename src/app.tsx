import { useEffect, useState } from "preact/hooks";
const issues = [
  {
    background: "bg-blue-700",
    title: "Horizons",
    description: "Explore new and exciting places with this issue",
    image: "/cover1.jpg",
  },
  {
    background: "bg-yellow-400",
    title: "Kaleido",
    description:
      "Discover a diverse range of content that will appeal to a wide audience in this issue",
    image: "/cover2.jpg",
  },
  {
    background: "bg-red-600",
    title: "Envision",
    description: "See the world in new and inspiring ways with this issue",
    image: "/cover3.jpg",
  },
  {
    background: "bg-green-600",
    title: "Catalyst ",
    description: "Spark change and innovation in this issue",
    image: "/cover4.jpg",
  },
  {
    background: "bg-blue-700",
    title: "Resonance",
    description: "Connect with readers on a deep level in this issue",
    image: "/cover5.jpg",
  },
  {
    background: "bg-yellow-400",
    title: "Vanguard",
    description:
      "Get cutting-edge insights and perspectives on a variety of topics in this issue",
    image: "/cover6.jpg",
  },
  {
    background: "bg-red-600",
    title: "Mosaic",
    description:
      "Reflect on the richness and complexity of the world around us in this issue",
    image: "/cover7.jpg",
  },
  {
    background: "bg-green-600",
    title: "Odyssey",
    description:
      "Embark on a journey of self-discovery and enlightenment in this issue",
    image: "/cover8.jpg",
  },
];

export function App() {
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const animateTransition = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 800);
  };
  const moveToNextIssue = () => {
    animateTransition();
    setTimeout(() => {
      setCurrentIssueIndex((prev) =>
        prev === issues.length ? prev : prev + 1
      );
    }, 200);
  };

  const moveToPrevIssue = () => {
    animateTransition();
    setTimeout(() => {
      setCurrentIssueIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }, 200);
  };

  const handleKeyDown = (ev: KeyboardEvent) => {
    const keycode = ev.key;
    if (keycode === "ArrowDown") {
      moveToNextIssue();
    }
    if (keycode === "ArrowUp") {
      moveToPrevIssue();
    }
  };

  const handleIssueClick = (index: number) => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 800);
    setCurrentIssueIndex(index);
  };

  const handleScroll = (ev: WheelEvent) => {
    const y = ev.deltaY;
    if (y > 0) {
      moveToNextIssue();
    } else if (y < 0) {
      moveToPrevIssue();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleScroll, { passive: false });
    setTimeout(() => setAnimate(false), 1000);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleScroll);
    };
  }, []);
  const currentIssue = issues[currentIssueIndex];

  return (
    <div
      className={`flex flex-col min-h-screen w-full relative pb-12 pt-4 px-4 ${currentIssue.background}`}
      style={{
        transition: "background-color 300ms ease-in-out",
      }}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">CORDIAL CONVERSATIONS</h1>
        <p className="font-bold">info@cordialconversations.org</p>
      </header>
      <main className="flex flex-col min-h-screen w-full relative">
        <p className="fixed left-0 bottom-0 text-4xl  w-1/5 p-2 text-center font-bold">
          {currentIssue?.description}
        </p>
        <div className="flex flex-col mb-4 items-end fixed bottom-0 right-4 gap-1">
          {issues.map((issue, i) => {
            const current = i === currentIssueIndex;
            return (
              <button
                key={`issue-${i}`}
                className={`${
                  current ? "text-3xl" : "text-2xl"
                }  font-bold transition-all`}
                onClick={() => handleIssueClick(i)}
              >
                {issue.title}
              </button>
            );
          })}
        </div>
        <div
          className={`flex flex-col items-center justify-center pt-20 self-center w-1/3 ${
            animate ? "animate-in-out" : ""
          }`}
          style={{
            height: "70vh",
          }}
        >
          <img
            className="drop-shadow-md shadow-2xl  h-full"
            src={currentIssue.image}
            alt={currentIssue.title}
          />
          <p className="mt-6 mb-2 font-bold text-xl text-center">
            {currentIssue.title}
          </p>
          <p className="text-xl font-bold text-center">
            BUY AT{" "}
            <button className="font-bold text-white no-underline pointer">
              SELECTED STORES
            </button>
          </p>
        </div>
      </main>
      <footer className="py-12 px-4">&copy; Cordial Conversations</footer>
    </div>
  );
}
