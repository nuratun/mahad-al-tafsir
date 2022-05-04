import React, { useState, useEffect } from "react";
import { YouTube } from "mdx-embed";
import styles from "./styles.module.css";

export default function VideoList({ children, data = {} }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [vidItem, setvidItem] = useState({});
  useEffect(() => {
    if ("hash" in window.location && window.location.hash !== "") {
      setItemIndex(window.location.hash.replace("#", ""));
    }
  }, [vidItem]);
  data.items.sort((a, b) => {
    const orderNoArrayA = a.snippet.title.split(" ")[0].split(".");
    const orderNoArrayB = b.snippet.title.split(" ")[0].split(".");
    const orderNoA = Number(orderNoArrayA[orderNoArrayA.length - 1]);
    const orderNoB = Number(orderNoArrayB[orderNoArrayB.length - 1]);
    if (orderNoA < orderNoB) {
      return -1;
    } else {
      return 1;
    }
  });
  function changeItem(i) {
    setvidItem(i);
  }
  return (
    <main>
      <h2>{`${Number(itemIndex) + 1} من ${data.items.length}: ${data.items[
        itemIndex
      ].snippet.title
        .replace(/[0-9]/g, "")
        .replace(/\./g, "")
        .replace(/\_/g, "")}`}</h2>
      {children}
      <div className="container">
        <div className="row">
          <div className="col col--9">
            <YouTube
              youTubeId={data.items[itemIndex].snippet.resourceId.videoId}
            />
          </div>
          <div className="col col--3">
            <div className={styles.videoNav}>
              <div>
                {Number(itemIndex) < data.items.length - 1 && (
                  <div className={styles.nextItem}>
                    <p>التسجيل التالى</p>
                    <a
                      onClick={() =>
                        changeItem(data.items[Number(itemIndex) + 1])
                      }
                      className={styles.btnContainer}
                      href={`#${Number(itemIndex) + 1}`}
                    >
                      <img
                        src={
                          data.items[Number(itemIndex) + 1].snippet.thumbnails
                            .medium.url
                        }
                      />
                      <div className={styles.overlay}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-play"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <p>
                          {data.items[Number(itemIndex) + 1].snippet.title
                            .replace(/[0-9]/g, "")
                            .replace(/\./g, "")
                            .replace(/\_/g, "")}
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
              <div className={styles.listContainer}>
                <p>من {data.items.length} تسجيلات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
