import './PhotoCard.css';

export function PhotoCard({ photo, onSelect }) {
  return (
    <figure className="photo-card fade-in">
      <button
        type="button"
        className="photo-card__btn"
        onClick={() => onSelect(photo)}
        aria-label={`View ${photo.title || photo.camera} full-size`}
      >
        <img src={photo.imageUrl} alt={photo.title || photo.camera} loading="lazy" />
      </button>
      <figcaption>
        <span className="eyebrow">Sol {photo.sol}</span>
        <span className="photo-card__camera">{photo.camera}</span>
      </figcaption>
    </figure>
  );
}
