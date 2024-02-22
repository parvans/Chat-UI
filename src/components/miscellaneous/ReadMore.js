/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import './styles.css';
import Linkify from 'react-linkify';

const ReadMore = ({ children, item,user }) => {
     const text = children;
     const [isReadMore, setIsReadMore] = useState(true);

     const toggleReadMore = () => {
          setIsReadMore(!isReadMore);
     };
     let splittedText = (isReadMore ? text?.slice(0, 210) : text)?.split('\n');

     let count1 = splittedText[0]?.length;
     // Display full text if isReadMore is true, otherwise display the sliced text
     const displayText = isReadMore ? text : text?.slice(0, 210);

     return (
          <>
               <div className={item.sender._id === user ? 'paraDiv' : null}>
                    <div className='readmorePara'>
                         {splittedText.map((line, index) => (
                              <React.Fragment key={index}>
                                   <p className='readmorePara' key={index}>
                                        <Linkify
                                            componentDecorator={(decoratedHref, decoratedText, key) => (
                                            <a target='blank' href={decoratedHref} key={key}>
                                                {decoratedText}
                                            </a>
                                            )}>
                                            {line === '' ? '\u00a0' : line}
                                        </Linkify>
                                   </p>{' '}
                              </React.Fragment>
                         ))}
                    </div>
                    {text.length > 210 && (
                         <span onClick={toggleReadMore} className='read-or-hide'>
                              {isReadMore ? 'read more' : 'show less'}
                         </span>
                    )}
               </div>
          </>
     );
};

export default ReadMore;

