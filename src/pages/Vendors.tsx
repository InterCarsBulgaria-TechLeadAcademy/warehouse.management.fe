import SkeletonPage from '@/components/features/SkeletonPage'

export default function Vendors() {
  //   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // setOpen(true);
    console.log('clicked')
  }

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <>
      <SkeletonPage
        header={'Доставчици'}
        description={'Управление на доставчици'}
        buttonText={'+ нов доставчик'}
        buttonClickHandler={handleClickOpen}
      />

      {/* <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment> */}
    </>
  )
}
