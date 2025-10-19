import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { exportImport } from '../utils/exportImport';

interface DataManagementDialogProps {
  open: boolean;
  onClose: () => void;
  onDataImported: () => void;
}

const DataManagementDialog: React.FC<DataManagementDialogProps> = ({
  open,
  onClose,
  onDataImported,
}) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    try {
      exportImport.downloadData();
      setMessage({ type: 'success', text: 'Data exported successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const success = await exportImport.importFromFile(file);
      if (success) {
        setMessage({ type: 'success', text: 'Data imported successfully!' });
        setTimeout(() => {
          setMessage(null);
          onDataImported();
          onClose();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Invalid file format' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to import data' });
    }

    // Reset input
    event.target.value = '';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Data Management</DialogTitle>
      <DialogContent>
        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Export Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Download your browsing data as a JSON file. You can use this to backup your data or
            transfer it to another device.
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            fullWidth
          >
            Export Data
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Import Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Import your previously exported data. This will replace your current data.
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
            fullWidth
          >
            Import Data
            <input
              type="file"
              hidden
              accept=".json"
              onChange={handleImport}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataManagementDialog;
