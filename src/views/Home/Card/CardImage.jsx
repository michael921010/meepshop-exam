import { useCallback, useEffect, useState, useRef } from "react";
import { Box, Popover, ButtonBase, TextField, InputAdornment, Stack, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Image } from "@/components/common";
import { usePopupState, bindTrigger, bindMenu } from "material-ui-popup-state/hooks";
import { ImageModel } from "@/modules/model";

export default function CardImage({ width, height, src, onChange, empty = false, disabled = false }) {
  const popupState = usePopupState({ variant: "popover", popupId: "card-image" });

  const fileRef = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [url, setUrl] = useState("");

  const handleSize = useCallback(
    (variable) => (evt) => {
      const val = evt.target.value;
      setSize((s) => ({ ...s, [variable]: +val }));
    },
    []
  );

  const handleUrl = useCallback((evt) => {
    const url = evt.target.value;
    setUrl(url);
  }, []);

  const handleImage = useCallback((evt) => {
    const filePath = fileRef.current?.value;

    // const folderPath = filePath.match(/(.*)[\/\\]/)?.[1] || "";
    const file = evt.target.files?.[0];

    if (file) {
      setUrl(URL.createObjectURL(file));
    }

    fileRef.current.value = "";
  }, []);

  const cancel = useCallback(() => {
    setSize({ width, height });
    setUrl(src ?? "");

    popupState.close();
  }, [width, height, src, popupState]);

  const save = useCallback(() => {
    const newModel = new ImageModel(url, {
      enabled: true,
      width: size.width,
      height: size.height,
    });

    onChange?.(newModel);
    popupState.close();
  }, [size, url, popupState, onChange]);

  useEffect(() => {
    setSize((s) => ({ ...s, width }));
  }, [width, popupState.isOpen]);

  useEffect(() => {
    setSize((s) => ({ ...s, height }));
  }, [height, popupState.isOpen]);

  useEffect(() => {
    setUrl(src ?? "");
  }, [src, popupState.isOpen]);

  if (empty) {
    return <Box width={width} height={height} sx={{ borderRadius: 1, bgcolor: "secondary.light" }} />;
  } else {
    return (
      <Box width={width} height={height}>
        {!!url ? (
          <ButtonBase {...bindTrigger(popupState)} disabled={disabled} sx={{ borderRadius: 1 }}>
            <Box>
              <Image alt="" src={src} width={width} height={height} />
            </Box>
          </ButtonBase>
        ) : (
          <ButtonBase
            {...bindTrigger(popupState)}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 1,
              bgcolor: "grey.200",
            }}
          >
            <ImageIcon />
          </ButtonBase>
        )}

        <Popover
          {...bindMenu(popupState)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Stack p={1} direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                size="small"
                type="text"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">URL</InputAdornment>,
                  },
                }}
                value={url}
                onChange={handleUrl}
                sx={{ width: 300 }}
              />

              <Button component="label" variant="contained" size="small">
                <input ref={fileRef} hidden type="file" accept="image/*" onChange={handleImage} />
                Import
              </Button>
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
