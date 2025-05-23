import { updateVersionData } from "../../_data/";

export const Notice1UpdateInfo = () => {
  return (
    <>
      <p>안녕하세요.</p>
      <p>CMWorld의 춘몽입니다.</p>
      <br />

      <p>
        춘몽월드의 개발과정이 궁금하신 분은{" "}
        <a
          href="https://springdream0406.tistory.com/category/Projects/%08CMWorld"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          개발일지
        </a>{" "}
        페이지를 방문해보세요.
      </p>
      <p>
        배포 버전의 자세한 변경사항이 궁금하신 분은{" "}
        <a
          href="https://springdream0406.tistory.com/114"
          target="_black"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Version Info
        </a>
        를 방문해보세요.
      </p>
      <br />

      {updateVersionData.map((item, index) => (
        <div className="flex flex-col p-2" key={index}>
          <div className="text-2xl text-blue-900">{item.title}</div>
          {item.sub.map((subitem, index) => (
            <div className="flex flex-row" key={index}>
              <div className="w-[8%] ml-4">{subitem.version}:</div>
              <div className="w-[77%]">{subitem.change}</div>
              <div className="w-[15%]">{subitem.date}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
