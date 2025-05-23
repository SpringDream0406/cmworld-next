import Link from "next/link";

export const Notice0Welcome = () => {
  return (
    <>
      <p>안녕하세요.</p>
      <p>CMWorld의 춘몽입니다.</p>
      <br />

      <p>
        해당 사이트는 CYWORLD를 모티브로 하여 제작한 포트폴리오 사이트입니다.
      </p>
      <p>
        둘러보시기 전에{" "}
        <Link href="/jukbox" className="text-basic hover:underline">
          쥬크박스
        </Link>
        에 방문하여 배경노래를 먼저 세팅해보세요.
      </p>
      <br />

      <p>서로를 알아가는 좋은 시간이 되셨으면 좋겠습니다.</p>
    </>
  );
};
