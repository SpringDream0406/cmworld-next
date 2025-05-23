import Image from "next/image";
import Link from "next/link";

export const Notice3AboutMusic = () => {
  return (
    <>
      <p>안녕하세요.</p>
      <p>CMWorld의 춘몽입니다.</p>
      <br />

      <div className="flex flex-row">
        <div className="flex flex-col">
          <p>
            개인적으로 춘몽월드를 만들면서 모티브로 삼은 싸이월드의 가장 큰
            특징은 BGM이라고 생각합니다.
          </p>
          <p>
            현재 춘몽월드의 BGM 기능은 React-Player를 사용하여 구현되었으며, 그
            중 Youtube를 연동하고 있습니다.
          </p>
          <p>
            때문에 현재 오른쪽에서 슬라이드 되고 있는 곡 정보를 클릭해보시면
            아래로 유튜브 화면을 볼 수 있습니다.
          </p>
          <br />

          <p>
            유튜브 링크들은 매일 한 번씩 자동 검사를 진행하고 있으며, 문제 발생
            시 수정하고 있습니다.
          </p>
        </div>
        <div className="ml-6">
          <Image
            src="/images/musicplayer.png"
            alt="musicplayer"
            width={100}
            height={100}
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      <p>
        만약 이상이 있으면 왼쪽 아래에 있는 제 이메일로 연락해 주시기를
        바랍니다.
      </p>
      <br />

      <p>
        플레이리스트 카테고리, 음량, 마지막 노래 인덱스, 랜덤재생 여부가
        자동으로 localStorage에 저장되어 재방문하셨을 때, 랜덤 재생상태가
        아니라면 마지막에 들으셨던 곡부터 이어서 들으실 수 있습니다.
      </p>
      <br />

      <p>노래는 취향에 맞는 노래를 발견할 때마다 지속해서 추가할 예정입니다.</p>
      <p>
        저의 취향에 맞는 노래들을 같이 들으면서 춘몽월드를 즐기셨으면
        좋겠습니다.
      </p>
      <br />
      <p>
        추가로 모바일은 뮤직플레이어만 사용할 수 있도록 했으며, 모바일만의
        UI/UX를 구현해 두었습니다.
      </p>
      <p>
        뮤직플레이어만 따로 사용하고 싶으시면{" "}
        <Link href="/musicplayer" className="text-basic hover:underline">
          뮤직플레이어
        </Link>
        에서 이용하실 수 있습니다.
      </p>
    </>
  );
};
