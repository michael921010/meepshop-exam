import { createContext, useContext, useCallback, useMemo, useReducer } from "react";
import { ImageModel, TextModel, CardModel } from "@/modules/model";
import { ItemTypes } from "@/configs/drag-items";

const Context = createContext();

const initState = {
  editing: false,

  images: [
    new CardModel({
      text: new TextModel("This is Meepshop.", { enabled: true }),
      image: new ImageModel("https://www.meepshop.com/meepshop_favicon.png", { enabled: true }),
    }),
  ],
  model: new CardModel(),
};

function reducer(state, action) {
  switch (action.type) {
    case "update_state": {
      return {
        ...state,
        [action?.namespace]: action?.value,
      };
    }
    case "reset_model": {
      return {
        ...state,
        model: new CardModel(),
      };
    }
    case "add_model": {
      return {
        ...state,
        images: [...state.images, action.model ?? state.model],
      };
    }
    case "move_model": {
      const newModel = new CardModel({
        text: state.model.text,
        image: state.model.image,
      });

      switch (action.slug) {
        case ItemTypes.TEXT: {
          newModel.text = new TextModel("", { enabled: true });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image = new ImageModel(null, { enabled: true });
          break;
        }
        default:
          break;
      }

      return {
        ...state,
        model: newModel,
      };
    }
    case "remove_model": {
      const newModel = new CardModel({
        text: state.model.text,
        image: state.model.image,
      });

      switch (action.slug) {
        case ItemTypes.TEXT: {
          newModel.text = new TextModel("", { enabled: false });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image = new ImageModel(null, { enabled: false });
          break;
        }
        default:
          break;
      }

      return {
        ...state,
        model: newModel,
      };
    }
    case "update_model": {
      const newModel = new CardModel({
        text: state.model.text,
        image: state.model.image,
      });

      switch (action.slug) {
        case ItemTypes.TEXT: {
          newModel.text =
            action.model ??
            new TextModel(action.value, {
              enabled: state.model.text.enabled,
            });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image =
            action.model ??
            new ImageModel(action.value, {
              enabled: state.model.image.enabled,
            });
          break;
        }
        default:
          break;
      }

      return {
        ...state,
        model: newModel,
      };
    }
    case "update_card_in_image_list": {
      const _card = state.images[action.index];

      if (!_card) {
        throw new Error(`There doesn't exist model in ${action.index} index.`);
      }

      const newCard = new CardModel({
        text: _card.text,
        image: _card.image,
      });

      switch (action.slug) {
        case ItemTypes.TEXT: {
          newCard.text = action.model ?? newCard.text;
          break;
        }
        case ItemTypes.IMAGE: {
          newCard.image = action.model ?? newCard.image;
          break;
        }
        default:
          break;
      }

      const newImages = state.images.slice();
      newImages[action.index] = newCard;

      return {
        ...state,
        images: newImages,
      };
    }

    default:
      throw new Error();
  }
}

const PageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const updateValue = useCallback(
    (namespace, value) => {
      dispatch({ type: "update_state", namespace, value });
    },
    [dispatch]
  );

  const value = useMemo(() => ({ state, dispatch, updateValue }), [state, updateValue]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const usePage = () => useContext(Context);

export { PageProvider, usePage };
