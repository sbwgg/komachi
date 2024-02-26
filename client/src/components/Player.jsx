import ReactPlayer from "react-player";
import styles from "../styles/Player.module.css";
import { DiscussionEmbed } from "disqus-react";
import { useEffect, useState } from "react";
import { ResponsiveVideoIframe } from "responsive-video-iframe";
import { FiPlayCircle } from "react-icons/fi";
import { ImCloudDownload } from "react-icons/im";

export default function Player({
  streamLink,
  currentEpisode,
  episodeDownloadLink,
  episodes,
  getStreamLink,
  setStreamLink,
  sources,
}) {
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);
  const [isNotNative, setIsNotNative] = useState(true);

  const nativeChecker = () => {
    const extension = String(streamLink).slice(-5);
    if (extension !== ".m3u8") {
      setIsNotNative(false);
    } else {
      setIsNotNative(true);
    }
  };

  useEffect(() => {
    nativeChecker();
  }, [streamLink]);
  return (
    <div>
      <section className={styles.streamingV2_ReactPlayer}>
        {streamLink && (
          <div>
            <div className={styles.streamingV2_ReactPlayerHeader}>
              <p>{`Episode ${
                String(currentEpisode).split("-")[
                  String(currentEpisode).split("-").length - 1
                ]
              }`}</p>
              <div className={styles.streaming_options}>
                <a
                  className={styles.streamingV2_Download}
                  href={episodeDownloadLink}
                  target="_blank"
                >
                  Download
                  <span className={styles.streamingV2_DownloadIcon}>
                    {<ImCloudDownload />}
                  </span>
                </a>
              </div>
            </div>
            {isNotNative ? (
              <ReactPlayer
                width="100%"
                height="auto"
                controls={true}
                playing={true}
                url={streamLink}
              />
            ) : (
              <ResponsiveVideoIframe
                title={currentEpisode}
                url={streamLink}
                width="100%"
                height="auto"
              />
            )}
          </div>
        )}
        <div className={styles.serverSources}>
          {sources &&
            sources.map((source, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setStreamLink(source.url);
                  }}
                >
                  <FiPlayCircle /> {source.name}
                </button>
              );
            })}
        </div>
        <div className={styles.streamingV2Buttons}>
          {episodes.map((episode, index) => {
            return (
              <button
                onClick={() => {
                  getStreamLink(episode.id);
                }}
                key={index}
                className={styles.streamingV2Button}
                style={{
                  backgroundColor:
                    currentEpisode === episode.id && "var(--primary)",
                }}
              >
                {episode.number}
              </button>
            );
          })}
        </div>
      </section>
      <div
        className={styles.disqus}
        style={{ padding: isCommentLoaded ? "15px" : "5px" }}
      >
        {isCommentLoaded ? (
          <DiscussionEmbed
            shortname="komachi-1"
            config={{
              url: streamLink,
              identifier: currentEpisode,
              title: currentEpisode,
            }}
          />
        ) : (
          <p
            onClick={() => {
              setIsCommentLoaded(true);
            }}
            style={{ cursor: "pointer" }}
          >
            Load Comments
          </p>
        )}
      </div>
    </div>
  );
}
