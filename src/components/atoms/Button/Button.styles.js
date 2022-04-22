import styled, { css } from 'styled-components'

export const Wrapper = styled.button`
  ${({ sort, add, type }) => {
    if (sort) {
      return css`
        margin-right: 15px;
        background: ${sort === 'title' ? '#fa0606' : '#f3dc11'};
        border: 1px solid rgba(27, 31, 35, 0.15);
        border-radius: 6px;
        box-shadow: rgb(27 31 35 / 10%) 0 1px 0;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 6px 16px;
        cursor: pointer;

        &:hover {
          background-color: ${sort === 'title' ? '#d00606' : '#e2cc09'};
        }
      `
    }
    if (add) {
      return css`
        font-weight: 500;
        font-size: 16px;
        padding: 0.7em 1.4em 0.7em 1.1em;
        color: #fff;
        background: ${add === 'create'
          ? 'linear-gradient(0deg,rgb(105 107 195) 0%,rgb(24 100 30) 100%)'
          : 'linear-gradient(0deg,rgb(55 57 164) 0%,rgb(16 24 136) 100%)'};
        border: none;
        box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
        letter-spacing: 0.05em;
        border-radius: 20em;
        cursor: pointer;
        margin-bottom: 10px;

        &:hover {
          background: #000;
        }
      `
    }
    if (type === 'delete') {
      return css`
        text-align: center;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;

        &:hover {
          background-color: #c82333;
          border-color: #bd2130;
          cursor: pointer;
        }
      `
    }
    if (type === 'get') {
      return css`
        background-color: #4d4ae8;
        background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.15),
          rgba(255, 255, 255, 0)
        );
        border: 1px solid #4d4ae8;
        border-radius: 1rem;
        box-shadow: rgb(255 255 255 / 15%) 0 1px 0 inset, rgb(46 54 80 / 8%) 0 1px 1px;
        color: #fff;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.5rem 0.5rem;
        text-align: center;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:hover {
          background-color: #b1b2db;
        }
      `
    }
    if (type === 'drop') {
      return css`
        visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
        background-color: #0078d0;
        border: 0;
        border-radius: 56px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-weight: 600;
        padding: 12px 16px;
        text-align: center;
        text-decoration: none;
        transition: all 0.3s;

        &:hover {
          background-color: #123b59;
        }
      `
    }
  }}}
`
