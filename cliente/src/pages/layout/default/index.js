import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Conteudo } from './styles';
export default function DefaultLayout({ children }) {
    return (
        <>
        <Wrapper>
            <Conteudo>{children}</Conteudo>
        </Wrapper>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};