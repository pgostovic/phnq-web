import React from 'react';
import { modelPropType } from '../../../api';

const View = ({ artist }) =>
  artist && (
    <div>
      <div>{artist.name}</div>
      {artist.type === 'Person' && (
        <div>
          {artist.beginDate && <div>Born {artist.beginDate}</div>}
          {artist.endDate && <div>Died {artist.endDate}</div>}
        </div>
      )}
      {artist.type === 'Group' && (
        <div>
          {artist.beginDate && <div>Formed {artist.beginDate}</div>}
          {artist.endDate && <div>Disbanded {artist.endDate}</div>}
        </div>
      )}
      <br />
      <br />
      <p className="description" dangerouslySetInnerHTML={{ __html: artist.bio.replace(/\n/g, '<br />') }} />
    </div>
  );

View.propTypes = {
  artist: modelPropType('Artist'),
};

View.defaultProps = {
  artist: null,
};

export default View;
