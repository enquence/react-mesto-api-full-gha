export const normalizeCard = ({ name, link, _id, likes, owner }) => {
  return {
    name: name,
    link: link,
    id: _id,
    likes: likes,
    owner: owner
  }
}
