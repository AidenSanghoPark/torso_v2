export const structure = (S) =>
  S.list()
    .title("관리자페이지")
    .id("root") // 루트 리스트에 id 추가
    .items([
      S.listItem()
        .title("디자이너")
        .id("designer-list") // 각 리스트 아이템에 id 추가
        .child(S.documentTypeList("designer").title("디자이너")),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => !["designer"].includes(listItem.getId())),
    ]);
