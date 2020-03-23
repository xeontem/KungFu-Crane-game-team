export const BUTTONS = {
  BACK: {
    textureName: 'back_btn_texture',
    texture: './img/buttons/back.png',
  },
  RESUME: {
    textureName: 'resume_btn_texture',
    texture: './img/buttons/resume.png',
  },
  LOAD: {
    textureName: 'load_btn_texture',
    texture: './img/buttons/load.png',
  },
  LOGIN: {
    textureName: 'login_btn_texture',
    texture: './img/buttons/login.png',
  },
  MAIN_MENU: {
    textureName: 'mmenu_btn_texture',
    texture: './img/buttons/mmenu.png',
  },
  RELOAD: {
    textureName: 'reload_btn_texture',
    texture: './img/buttons/reload.png',
  },
  SAVE: {
    textureName: 'save_btn_texture',
    texture: './img/buttons/save.png',
  },
  SCORES: {
    textureName: 'scores_btn_texture',
    texture: './img/buttons/scores.png',
  },
  START: {
    textureName: 'start_btn_texture',
    texture: './img/buttons/start.png',
  },
};

export const withHandler = (btn, handler) => {
  return ({
    ...btn,
    handler,
  });
};
