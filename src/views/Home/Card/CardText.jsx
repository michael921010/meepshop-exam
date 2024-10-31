import { useCallback, useEffect, useState, useRef } from "react";
import { Box, Typography, Popover, ButtonBase, TextField, InputAdornment, Stack, Button } from "@mui/material";
import { usePopupState, bindTrigger, bindMenu } from "material-ui-popup-state/hooks";
import { TextModel } from "@/modules/model";

export default function CardText({ width, height, src, onChange, empty = false, disabled = false }) {
  const popupState = usePopupState({ variant: "popover", popupId: "card-text" });

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [text, setText] = useState("");

  const handleSize = useCallback(
    (variable) => (evt) => {
      const val = evt.target.value;
      setSize((s) => ({ ...s, [variable]: +val }));
    },
    []
  );

  const handleText = useCallback((evt) => {
    const val = evt.target.value;
    setText(val);
  }, []);

  const cancel = useCallback(() => {
    setSize({ width, height });
    setText("");

    popupState.close();
  }, [width, height, popupState]);

  const save = useCallback(() => {
    const newModel = new TextModel(text, {
      enabled: true,
      width: size.width,
      height: size.height,
    });

    onChange?.(newModel);
    popupState.close();
  }, [text, size, popupState, onChange]);

  useEffect(() => {
    setSize((s) => ({ ...s, width }));
  }, [width, popupState.isOpen]);

  useEffect(() => {
    setSize((s) => ({ ...s, height }));
  }, [height, popupState.isOpen]);

  useEffect(() => {
    setText(src ?? "");
  }, [src, popupState.isOpen]);

  if (empty) {
    return <Box width={width} height={height} sx={{ borderRadius: 1, bgcolor: "secondary.light" }} />;
  } else {
    return (
      <Box width={width} height={height}>
        <ButtonBase
          {...bindTrigger(popupState)}
          disabled={disabled}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 1,
            textAlign: "left",
            justifyContent: "start",

            ...(!disabled && {
              p: 1,

              boxShadow: "0 0 0 1px var(--mui-palette-grey-200)",
            }),
          }}
        >
          <Box>
            <Typography component="p">{src ?? ""}</Typography>
          </Box>
        </ButtonBase>

        <Popover
          {...bindMenu(popupState)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Stack p={1} direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField size="small" type="text" value={text} onChange={handleText} sx={{ width: 180 }} />
            </Stack>

            <TextField
              size="small"
              type="number"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">Width</InputAdornment>,
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                },
              }}
              value={size.width}
              onChange={handleSize("width")}
              sx={{ width: 180 }}
            />

            <TextField
              size="small"
              type="number"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">Height</InputAdornment>,
                  endAdornment: <InputAdornment position="end">px</InputAdornment>,
                },
              }}
              value={size.height}
              onChange={handleSize("height")}
              sx={{ width: 180 }}
            />

            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-evenly" spacing="1">
              <Button variant="contained" size="small" color="error" onClick={cancel}>
                Cancel
              </Button>

              <Button variant="contained" size="small" color="success" onClick={save}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Popover>
      </Box>
    );
  }
}
