import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "store/actionCreators/index";
import deleteIcon from "assets/search/delete.png";
import { useHistory } from "react-router-dom";

const styles = {
  wrapper: {
    marginBottom: "3.2rem",
    padding: "2rem 1.6rem",
    color: "#3C3C3C",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: 700,
  },
  icon: {
    width: "1.4rem",
    height: "1.4rem",
  },
  historyContainer: {
    display: "flex",
    margin: ".4rem 1.2rem 0 0",
  },
  tag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "5rem",
    boxSizing: "border-box",
    margin: "1.2rem 1.2rem 0 0",
    padding: ".8rem 1.2rem",
    minHeight: "3rem",
    borderRadius: "2.8rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: "rgba(0,0,0,.04)",
  },
};

export default function History() {
  const tags = useSelector((state) => state.search.historyList);
  const dispatch = useDispatch();
  const history = useHistory();
  const removeAllHistory = () => {
    const action = actionCreators.removeAllSearchHistory();
    dispatch(action);
  };

  return (
    <div style={styles["wrapper"]}>
      <div style={styles["header"]}>
        <span style={styles["title"]}>搜索历史</span>
        <img
          style={styles["icon"]}
          src={deleteIcon}
          alt="删除"
          onClick={removeAllHistory}
        />
      </div>
      <div style={styles["historyContainer"]}>
        {tags.map((tag, index) => (
          <span
            onClick={() => {
              history.push(`/list?keyword=${encodeURI(tag)}`);
            }}
            key={index}
            style={styles["tag"]}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
